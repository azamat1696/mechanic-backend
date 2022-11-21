// /* eslint-disable prettier/prettier */
// import { PassportSerializer } from '@nestjs/passport';
// // import { deserializeUser, serializeUser } from 'passport';
// import { UsersService } from 'src/users/services/users.service';
// import { Inject } from '@nestjs/common';
// import { User } from '../users/user.entity';

// export class SessionSerializer extends PassportSerializer {
//   constructor(
//     @Inject(UsersService) private readonly usersService: UsersService
//   ) {
//     super();
//   }

//   serializeUser(user: User, done: (err, user: User) => void) {
//     done(null, user);
//   }

//   deserializeUser(user: User, done: (err, user: User) => void)  {
//     const userDB = await this.usersService.findAll()
//   }
// }
