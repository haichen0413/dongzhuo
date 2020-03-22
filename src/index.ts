import "reflect-metadata";
import { createConnection, Repository } from "typeorm";
import { User } from "./entity/User";
import { Accounts } from "./entity/accounts";

createConnection()
  .then(async connection => {
    console.log({ connection });
    const user = new User();
    user.firstName = "hai";
    user.lastName = "chen";
    user.age = 25;
    await connection.manager.save(user);

    const accounts = new Accounts();
    accounts.nickname = "nick";
    accounts.status = 10;
    await connection.manager.save(accounts);

    // const allUsers = await connection.manager.find();

    // console.log(`${allUsers}`);

    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);
  })
  .catch(error => console.log(error));
