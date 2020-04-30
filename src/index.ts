import { Photo } from "./entity/Photo"
import "reflect-metadata"
import { createConnection, Repository } from "typeorm"
import { User } from "./entity/User"
import { Accounts } from "./entity/Accounts"
import { Profile } from "./entity/Profile"

createConnection()
  .then(async connection => {
    const profile = new Profile()
    profile.gender = "男"
    profile.photo = "hai"
    let profileRepository = connection.getRepository(Profile)
    // await profileRepository.save(profile)

    // const user = new User()
    // user.firstName = "hai111"
    // user.lastName = "chen11"
    // user.age = 25
    // // user.profile = profile
    // await connection.manager.save(user)

    // const photo1 = new Photo()
    // photo1.url = "me.jpg"
    // photo1.user = user
    // await connection.manager.save(photo1)
    // // console.log({ users: JSON.stringify(users) })

    // const photo2 = new Photo()
    // photo2.url = "me-and-bears.jpg"
    // photo2.user = user
    // await connection.manager.save(photo2)

    const users = await connection
      .getRepository(Photo)
      .createQueryBuilder("photo")
      // .where("user.id = :id", { id: 2 })
      .leftJoinAndSelect("photo.user", "user")
      .getMany()

    console.log({ users: JSON.stringify(users) })

    const accounts = new Accounts()
    accounts.nickname = "海晨"
    accounts.status = 0
    accounts.description = "这是一个人名字"
    accounts.isPub = false
    // accounts.haichen = "true";

    let accountsRepository = connection.getRepository(Accounts)
    // const saveAcc = await accountsRepository.save(accounts);
    // console.log({ saveAcc });

    // 查找全部
    const allAcc = await accountsRepository.find()
    // console.log("findall", allAcc);

    // 查找某个id 返回是对象
    // SELECT * FROM USER WHERE id = 2
    const findId = await accountsRepository.findOne(2)
    // console.log({ findId });

    // update
    // findId.status = 20;
    // await accountsRepository.save(findId);

    // 查找某个列的值
    const findNick = await accountsRepository.findOne({ nickname: "名字" })
    const findNick1 = await accountsRepository.find({ nickname: "nick-0323-hai" })
    // console.log({ findNick });
    findNick.description = "更新description的值"
    await accountsRepository.save(findNick)

    const [allAcco, accountsCount] = await accountsRepository.findAndCount()
    const allData = await accountsRepository.findAndCount()
    // console.log({ allAcco, accountsCount })
    // const allUsers = await connection.manager.find();

    // delete
    const findNickName = await accountsRepository.find({ nickname: "nick-0323" })
    await accountsRepository.remove(findNickName)
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);
  })
  .catch(error => console.log(error))
