/*
 * @motto: motto
 * @Author: haichen
 * @Date: 2020-03-24 15:17:28
 * @LastEditors: haichen
 * @LastEditTime: 2020-04-30 11:35:18
 */
import "reflect-metadata"
import { createConnection, Repository } from "typeorm"
import { User } from "./entity/User"
import { Accounts } from "./entity/Accounts"

createConnection()
  .then(async connection => {
    const user = new User()
    user.firstName = "hai"
    user.lastName = "chen"
    user.age = 25
    // await connection.manager.save(user);

    const accounts = new Accounts()
    accounts.nickname = "nick-0323-hai"
    accounts.status = 10
    accounts.description = "this is a text type of description"
    accounts.isPub = true

    let accountsRepository = connection.getRepository(Accounts)
    // console.log({ accountsRepository });
    // const saveAcc = await accountsRepository.save(accounts);

    // 查找全部
    const allAcc = await accountsRepository.find()
    // console.log("All photos from the db: ", allAcc);

    // 查找某个id 返回是对象
    const findId = await accountsRepository.findOne(2)
    console.log({ findId })

    // update
    // findId.status = 20;
    // await accountsRepository.save(findId);

    // 查找某个列的值
    const findNick = await accountsRepository.findOne({ nickname: "nick-0323-hai" })
    const findNick1 = await accountsRepository.find({ nickname: "nick-0323-hai" })

    findNick.isPub = false
    await accountsRepository.save(findNick)

    const [allAcco, accountsCount] = await accountsRepository.findAndCount()
    const allData = await accountsRepository.findAndCount()
    // const allUsers = await connection.manager.find();

    // delete
    const findNickName = await accountsRepository.find({ nickname: "nick-0323" })
    await accountsRepository.remove(findNickName)
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);
  })
  .catch(error => console.log(error))
