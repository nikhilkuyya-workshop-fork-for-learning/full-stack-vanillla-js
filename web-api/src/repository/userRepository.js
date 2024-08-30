import { promisify }  from 'util';
export default class UserRepository {
  #db;
  constructor({db}){
    this.#db = db;
  }

  async find() {
    const pr = new Promise((res,rej) => {
      this.#db.all('SELECT name, age, email FROM user;',[],(err,data) => {
        if(err) {
          rej(err)
        }
        return res(data)
      });
    });
    const data =  await pr;
    return data;
  }

  async create({name, age, email}) {
    const pr = new Promise((res,rej) => {
      // const command = `INSERT INTO user (name, age, email) VALUES (${name}, ${age}, ${email})`;
      this.#db.run(`INSERT INTO user (name, age, email) VALUES (?, ?, ?);`,[name, age, email],(err,data) => {
      if(err) { rej(err);}
      res(data);
      })
    });
    await pr;
  }

}
