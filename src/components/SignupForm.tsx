'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';
import { Role, SignupFormState } from '@/types/SignupFormState'; // Doğru import yolunu kontrol edin
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/Redux-Toolkit/store';
import { signupThunk } from '@/lib/Redux-Toolkit/Thunks/SignupThunk';


const SignupForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormState>();
  const [showStoreFields, setShowStoreFields] = useState(false);
  const roles: Role[] = [
    { id: '1', name: 'Admin' },
    { id: '2', name: 'Store' },
    { id: '3', name: 'Customer' },
  ];

  const selectedRole = watch('roleId');

  const dispatch = useDispatch<AppDispatch>();    
    const user = useSelector((state:RootState) => state.client.user);
    // burada genelde storedan ımport edılmeme durumu oluyor dırekt tooklıtten edılen ımport hatalı  olur. storedakı rootstate lazım.

  useEffect(() => {
    setShowStoreFields(selectedRole === '2');
  }, [selectedRole]);

  const onSubmit: SubmitHandler<SignupFormState> = (data) => { // burada passwordConfirmation olan type ama datadakı type da passwordConfirmation yok.
    const { ...filteredData } = data;
    console.log(filteredData);
    dispatch( signupThunk(filteredData) );
            console.log(data);
    // Burada API isteği gönderilebilir.
  };

  useEffect(() => {console.log(user);}, [user]);
  // user state'ini izliyoruz ve güncellemeleri konsola yazdırıyoruz.

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Kayıt Ol</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Ad</label>
        <input
          type="text"
          id="name"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
          {...register('name', { required: 'Ad zorunludur.', minLength: { value: 3, message: 'Ad minimum 3 karakter olmalıdır.' } })}
        />
        {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-posta</label>
        <input
          type="email"
          id="email"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
          {...register('email', { required: 'E-posta zorunludur.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Geçerli bir e-posta adresi giriniz.' } })}
        />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Şifre</label>
        <input
          type="password"
          id="password"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
          {...register('password', {
            required: 'Şifre zorunludur.',
            minLength: { value: 8, message: 'Şifre minimum 8 karakter olmalıdır.' },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).+$/,
              message: 'Şifre küçük harf, büyük harf, rakam ve özel karakter içermelidir.',
            },
          })}
        />
        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="passwordConfirmation" className="block text-gray-700 text-sm font-bold mb-2">Şifre Tekrar</label>
        <input
          type="password"
          id="passwordConfirmation"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.passwordConfirmation ? 'border-red-500' : ''}`}
          {...register('passwordConfirmation', {
            required: 'Şifre tekrarı zorunludur.',
            validate: (value) => value === watch('password') || 'Şifreler eşleşmelidir.',
          })}
        />
        {errors.passwordConfirmation && <p className="text-red-500 text-xs italic">{errors.passwordConfirmation.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="roleId" className="block text-gray-700 text-sm font-bold mb-2">Rol</label>
        <select
          id="roleId"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.roleId ? 'border-red-500' : ''}`}
          {...register('roleId', { required: 'Bir rol seçimi zorunludur.' })}
          defaultValue="3"
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>{role.name} </option>
          ))}
        </select>
        {errors.roleId && <p className="text-red-500 text-xs italic">{errors.roleId.message}</p>}
      </div>

      {showStoreFields && (
        <>
          <div className="mb-4">
            <label htmlFor="storeName" className="block text-gray-700 text-sm font-bold mb-2">Mağaza Adı</label>
            <input
              type="text"
              id="storeName"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.storeName ? 'border-red-500' : ''}`}
              {...register('storeName', { required: 'Mağaza adı zorunludur.', minLength: { value: 3, message: 'Mağaza adı minimum 3 karakter olmalıdır.' } })}
            />
            {errors.storeName && <p className="text-red-500 text-xs italic">{errors.storeName.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="storePhone" className="block text-gray-700 text-sm font-bold mb-2">Mağaza Telefonu</label>
            <input
              type="tel"
              id="storePhone"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.storePhone ? 'border-red-500' : ''}`}
              {...register('storePhone', { required: 'Mağaza telefonu zorunludur.', pattern: { value: /^(05)([0-9]{9})$/, message: 'Geçerli bir Türkiye telefon numarası giriniz (Örn: 05xxxxxxxxx).' } })}
            />
            {errors.storePhone && <p className="text-red-500 text-xs italic">{errors.storePhone.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="storeTaxNo" className="block text-gray-700 text-sm font-bold mb-2">Vergi Numarası</label>
            <input
              type="text"
              id="storeTaxNo"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.storeTaxNo ? 'border-red-500' : ''}`}
              {...register('storeTaxNo', { required: 'Vergi numarası zorunludur.', pattern: { value: /^T[0-9]{4}V[0-9]{6}$/, message: 'Geçerli bir vergi numarası giriniz (Örn: TXXXXVXXXXXX).' } })}
            />
            {errors.storeTaxNo && <p className="text-red-500 text-xs italic">{errors.storeTaxNo.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="storeBankAccount" className="block text-gray-700 text-sm font-bold mb-2">Banka Hesap (IBAN)</label>
            <input
              type="text"
              id="storeBankAccount"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.storeBankAccount ? 'border-red-500' : ''}`}
              {...register('storeBankAccount', { required: 'IBAN adresi zorunludur.', pattern: { value: /^TR[0-9]{2}[0-9]{5}[A-Z0-9]{17}$/, message: 'Geçerli bir IBAN adresi giriniz.' } })}
            />
            {errors.storeBankAccount && <p className="text-red-500 text-xs italic">{errors.storeBankAccount.message}</p>}
          </div>
        </>
      )}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        // disabled={!isValid}
      >
        Kayıt Ol
      </button>
    </form>
  );
};

export default SignupForm;