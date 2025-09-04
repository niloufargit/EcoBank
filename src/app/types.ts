type LoginRequestDto = {
    clientCode: string,
    password: string
}

type LoginResponseDto = {
    jwt: string,
    user:{
        clientCode: string,
        name:string
    }
}

type RegisterRequestDto = {
    name: string,
    password: string
}

type RegisterResponseDto = {
    jwt: string,
    user:{
        clientCode: string,
        name:string
    }

}

type TransactionDto = {
  //transaction id
  id: string,
  amount: number,
  description: string,
  emitter: {
    //emitter account id
    id: string,
    owner: {
      name: string
    }
  },
  receiver: {
    //receiver account id
    id: string,
    owner: {
      name: string
    }
  },
  emittedAt: string,
  status: string
}

export {LoginRequestDto, LoginResponseDto, RegisterRequestDto, RegisterResponseDto, TransactionDto}
