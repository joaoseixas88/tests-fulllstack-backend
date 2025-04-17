import { pick } from 'radash';
import { User } from 'src/modules/user/model';

export const mapUser = (user: Omit<User, 'role'> | Omit<User, 'role'>[]) => {
  if (Array.isArray(user)) {
    return user.map((u) => pick(u, ['id', 'name', 'surname', 'age', 'job']));
  } else {
    return pick(user, ['id', 'name', 'surname', 'age', 'job']);
  }
};
