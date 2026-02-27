import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * useAuth 커스텀 훅
 * 로그인 상태 및 사용자 정보를 관리합니다.
 */
export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('mini_sns_user');
    if (saved) {
      setCurrentUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  /**
   * 로그인 처리
   * @param {string} email
   * @param {string} password
   * @returns {{ user: object|null, error: string|null }}
   */
  const login = async (email, password) => {
    const { data, error } = await supabase
      .from('sns_users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !data) {
      return { user: null, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    }

    localStorage.setItem('mini_sns_user', JSON.stringify(data));
    setCurrentUser(data);
    return { user: data, error: null };
  };

  /**
   * 회원가입 처리
   */
  const signup = async ({ email, password, username, displayName }) => {
    const { data, error } = await supabase
      .from('sns_users')
      .insert([{ email, password, username, display_name: displayName }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return { user: null, error: '이미 사용 중인 이메일 또는 사용자명입니다.' };
      }
      return { user: null, error: '회원가입에 실패했습니다.' };
    }

    localStorage.setItem('mini_sns_user', JSON.stringify(data));
    setCurrentUser(data);
    return { user: data, error: null };
  };

  /**
   * 로그아웃
   */
  const logout = () => {
    localStorage.removeItem('mini_sns_user');
    setCurrentUser(null);
  };

  return { currentUser, loading, login, signup, logout };
}
