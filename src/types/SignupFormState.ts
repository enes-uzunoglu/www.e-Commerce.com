export interface Role {
    id: string;
    name: string;
  }
  
  export interface SignupFormState {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    roleId: string;
    roles: Role[];
    showStoreFields: boolean;
    storeName: string;
    storePhone: string;
    storeTaxNo: string;
    storeBankAccount: string;
    errors: {
      name?: string;
      email?: string;
      password?: string;
      passwordConfirmation?: string;
      roleId?: string;
      storeName?: string;
      storePhone?: string;
      storeTaxNo?: string;
      storeBankAccount?: string;
    };
  }