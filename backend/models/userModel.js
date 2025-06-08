import supabase from '../config/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function userRegister(name, email, password) {
    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            console.error('Registration error:', authError.message);
            return { error: authError.message };
        }

        if (!authData?.user) {
            console.error('User data missing after registration.');
            return { error: 'User data not returned by Supabase.' };
        }

        const { error: insertError } = await supabase
            .from('users')
            .insert([{ id: authData.user.id, name, email, password }]);

        if (insertError) {
            console.error('Database insert error:', insertError.message);
            return { error: insertError.message };
        }

        console.log('User registered and inserted:', authData.user);
        return { data: authData.user };
    } catch (err) {
        console.error('Unexpected error:', err.message);
        return { error: 'Something went wrong during registration.' };
    }
}

export async function userLogin(email, password) {
    try {
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (loginError) {
            console.error('Login error:', loginError.message);
            return { error: loginError.message };
        }

        if (!loginData?.user) {
            console.error('Login succeeded but user data is missing.');
            return { error: 'User data not returned by Supabase.' };
        }

        if (!loginData?.session) {
            console.error('Login succeeded but session data is missing.');
            return { error: 'Session not returned by Supabase.' };
        }

        const token = jwt.sign(
            { id: loginData.user.id, name: loginData.user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('User logged in:', loginData.user);
        return {
            data: {
                user: loginData.user,
                token: token
            }
        };
    } catch (err) {
        console.error('Unexpected error:', err.message);
        return { error: 'Something went wrong during login.' };
    }
}


export async function userLogout() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Logout error:', error.message);
            return { error: error.message };
        }
        console.log('User logged out successfully');
        return { data: 'User logged out successfully' };
    } catch (err) {
        console.error('Unexpected error during logout:', err.message);
        return { error: 'Something went wrong during logout.' };
    }
}