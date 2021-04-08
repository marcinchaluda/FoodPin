import {AddressModel} from './AddressModel';
import {InitData} from './InitData';
import {Unit} from './Unit';

export class InitDataModel {
  public address: object;
  public units: Array<Unit>;


  constructor(input: InitData) {
    this.address = this.createAddress(input?.address);
    this.units = this.createUnits(input?.units);
  }

  createAddress(address: object | undefined): AddressModel {
    return new AddressModel(address);
  }

  createUnits(units: []): Array<Unit> {
    const unitsArray = [];
    units.forEach(unit => {
      unitsArray.push(unit);
    });
    return unitsArray;
  }
}
