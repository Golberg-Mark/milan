import { Roles } from '@/store/reducers/user';

export default (role: Roles) => {
  switch (role) {
    case Roles.CUSTOMER: return 'Customer';
    case Roles.CUSTOMER_ADMIN: return 'Customer Admin';
    case Roles.SYSTEM_ADMIN: return 'System Admin';
  }
}
