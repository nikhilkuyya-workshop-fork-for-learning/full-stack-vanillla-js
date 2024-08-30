
export default class Service {
  #url;
  constructor({url}){
    this.#url = url;
  }

  async getUsers() {
    const result  = await fetch(`${this.#url}/users`);
    const data =  await result.json();
    return data;
  }

  async createUser(data) {
    const result = await fetch(`${this.#url}/users`,{ method: 'POST',body: JSON.stringify(data)});
    return result.json();
  }

}
