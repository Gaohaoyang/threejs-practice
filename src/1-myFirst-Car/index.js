console.log('------------------------------------')
const a = 123466677
console.log(a)
console.log('------------------------------------')

class C {
  constructor(name) {
    this.name = name
    console.log('constructor')
  }
}

const c = new C('Joe')
console.log(c.name)
