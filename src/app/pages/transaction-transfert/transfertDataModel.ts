export interface TransfertDataModel {
  receiverAccountId?:string|null;
  amount?:number|null;
  description?:string|null;
  /*constructor(receiverAccountId: string, amount: number, description: string) {
    this.receiverAccountId = receiverAccountId;
    this.amount = amount;
    this.description = description;
  }*/
}

export  interface   obj {
  cc: TransfertDataModel,
  emitterAccountId: string
}
