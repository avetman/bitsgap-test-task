import { observable, computed, action, makeObservable } from "mobx";

import type { OrderSide, ProfitTarget } from "../model";

export class PlaceOrderStore {
  constructor() {
    makeObservable(this);
  }

  @observable activeOrderSide: OrderSide = "buy";
  @observable price = 0;
  @observable amount = 0;
  @observable showContent = false;
  @observable profitTargets: ProfitTarget[] = [
    {profit:2, price:0, amount:20}
  ]

  @computed get total(): number {
    return this.price * this.amount;
  }
  @computed get projectedProfit(): number {
    return this.profitTargets.reduce((sum, target) => {
      const { amount, profit } = target;
      const formPrice = this.price;
      const targetPrice = this.activeOrderSide === 'buy'
          ? formPrice * (1 + profit / 100)
          : formPrice * (1 - profit / 100);

      const targetAmount = amount * 0.01;
      const profitForTarget = this.activeOrderSide === 'buy' ? targetAmount * (targetPrice - formPrice) : targetAmount * (formPrice - targetPrice);

      return sum + profitForTarget;
    }, 0);
  }

  @action
  public setShowContent = (value: boolean) => {
    this.showContent = value
  }
  @action
  public setOrderSide = (side: OrderSide) => {
    this.activeOrderSide = side;
  };

  @action
  public setPrice = (price: number) => {
    this.price = price;
  };

  @action
  public setAmount = (amount: number) => {
    this.amount = amount;
  };

  @action
  public setTotal = (total: number) => {
    this.amount = this.price > 0 ? total / this.price : 0;
  };

  @action
  public updateProfitTarget = (updatedTarget:ProfitTarget, index) => {
    const updatedTargets = [...this.profitTargets];
    updatedTargets[index] = updatedTarget;
    this.profitTargets = updatedTargets;
  }
  @action
  public addProfitTarget = (newTarget: ProfitTarget) => {
    this.profitTargets.push(newTarget);
  }

  @action
  public removeProfitTarget = (index: number) => {
    if (index >= 0 && index < this.profitTargets.length) {
      this.profitTargets = this.profitTargets.filter((_, i) => i !== index);
    }
  }
}
