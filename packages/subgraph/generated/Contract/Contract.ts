// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  EthereumCall,
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  EthereumTuple,
  Bytes,
  Address,
  BigInt,
  CallResult
} from "@graphprotocol/graph-ts";

export class NewSubscriptionPage extends EthereumEvent {
  get params(): NewSubscriptionPage__Params {
    return new NewSubscriptionPage__Params(this);
  }
}

export class NewSubscriptionPage__Params {
  _event: NewSubscriptionPage;

  constructor(event: NewSubscriptionPage) {
    this._event = event;
  }

  get creator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get metadata(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get policyInfo(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get fees(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class NewCreatorPost extends EthereumEvent {
  get params(): NewCreatorPost__Params {
    return new NewCreatorPost__Params(this);
  }
}

export class NewCreatorPost__Params {
  _event: NewCreatorPost;

  constructor(event: NewCreatorPost) {
    this._event = event;
  }

  get creator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get post(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }
}

export class ApprovedSubscription extends EthereumEvent {
  get params(): ApprovedSubscription__Params {
    return new ApprovedSubscription__Params(this);
  }
}

export class ApprovedSubscription__Params {
  _event: ApprovedSubscription;

  constructor(event: ApprovedSubscription) {
    this._event = event;
  }

  get creator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get buyer(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class NewSubscriber extends EthereumEvent {
  get params(): NewSubscriber__Params {
    return new NewSubscriber__Params(this);
  }
}

export class NewSubscriber__Params {
  _event: NewSubscriber;

  constructor(event: NewSubscriber) {
    this._event = event;
  }

  get buyer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get creator(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Contract__creatorsResult {
  value0: Bytes;
  value1: Address;
  value2: BigInt;
  value3: Bytes;

  constructor(value0: Bytes, value1: Address, value2: BigInt, value3: Bytes) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromFixedBytes(this.value0));
    map.set("value1", EthereumValue.fromAddress(this.value1));
    map.set("value2", EthereumValue.fromUnsignedBigInt(this.value2));
    map.set("value3", EthereumValue.fromFixedBytes(this.value3));
    return map;
  }
}

export class Contract__policiesResult {
  value0: Bytes;
  value1: BigInt;

  constructor(value0: Bytes, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromFixedBytes(this.value0));
    map.set("value1", EthereumValue.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class Contract extends SmartContract {
  static bind(address: Address): Contract {
    return new Contract("Contract", address);
  }

  owner(): Address {
    let result = super.call("owner", []);

    return result[0].toAddress();
  }

  try_owner(): CallResult<Address> {
    let result = super.tryCall("owner", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  creators(param0: Address): Contract__creatorsResult {
    let result = super.call("creators", [EthereumValue.fromAddress(param0)]);

    return new Contract__creatorsResult(
      result[0].toBytes(),
      result[1].toAddress(),
      result[2].toBigInt(),
      result[3].toBytes()
    );
  }

  try_creators(param0: Address): CallResult<Contract__creatorsResult> {
    let result = super.tryCall("creators", [EthereumValue.fromAddress(param0)]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(
      new Contract__creatorsResult(
        value[0].toBytes(),
        value[1].toAddress(),
        value[2].toBigInt(),
        value[3].toBytes()
      )
    );
  }

  policies(param0: Bytes): Contract__policiesResult {
    let result = super.call("policies", [EthereumValue.fromFixedBytes(param0)]);

    return new Contract__policiesResult(
      result[0].toBytes(),
      result[1].toBigInt()
    );
  }

  try_policies(param0: Bytes): CallResult<Contract__policiesResult> {
    let result = super.tryCall("policies", [
      EthereumValue.fromFixedBytes(param0)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(
      new Contract__policiesResult(value[0].toBytes(), value[1].toBigInt())
    );
  }
}

export class ConstructorCall extends EthereumCall {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateSubscriptionPageCall extends EthereumCall {
  get inputs(): CreateSubscriptionPageCall__Inputs {
    return new CreateSubscriptionPageCall__Inputs(this);
  }

  get outputs(): CreateSubscriptionPageCall__Outputs {
    return new CreateSubscriptionPageCall__Outputs(this);
  }
}

export class CreateSubscriptionPageCall__Inputs {
  _call: CreateSubscriptionPageCall;

  constructor(call: CreateSubscriptionPageCall) {
    this._call = call;
  }

  get fees(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get metadata(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get policyInfo(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class CreateSubscriptionPageCall__Outputs {
  _call: CreateSubscriptionPageCall;

  constructor(call: CreateSubscriptionPageCall) {
    this._call = call;
  }
}

export class CreatePostCall extends EthereumCall {
  get inputs(): CreatePostCall__Inputs {
    return new CreatePostCall__Inputs(this);
  }

  get outputs(): CreatePostCall__Outputs {
    return new CreatePostCall__Outputs(this);
  }
}

export class CreatePostCall__Inputs {
  _call: CreatePostCall;

  constructor(call: CreatePostCall) {
    this._call = call;
  }

  get data(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class CreatePostCall__Outputs {
  _call: CreatePostCall;

  constructor(call: CreatePostCall) {
    this._call = call;
  }
}

export class ApproveSubscriptionCall extends EthereumCall {
  get inputs(): ApproveSubscriptionCall__Inputs {
    return new ApproveSubscriptionCall__Inputs(this);
  }

  get outputs(): ApproveSubscriptionCall__Outputs {
    return new ApproveSubscriptionCall__Outputs(this);
  }
}

export class ApproveSubscriptionCall__Inputs {
  _call: ApproveSubscriptionCall;

  constructor(call: ApproveSubscriptionCall) {
    this._call = call;
  }

  get buyer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ApproveSubscriptionCall__Outputs {
  _call: ApproveSubscriptionCall;

  constructor(call: ApproveSubscriptionCall) {
    this._call = call;
  }
}

export class CreateSubscriptionCall extends EthereumCall {
  get inputs(): CreateSubscriptionCall__Inputs {
    return new CreateSubscriptionCall__Inputs(this);
  }

  get outputs(): CreateSubscriptionCall__Outputs {
    return new CreateSubscriptionCall__Outputs(this);
  }
}

export class CreateSubscriptionCall__Inputs {
  _call: CreateSubscriptionCall;

  constructor(call: CreateSubscriptionCall) {
    this._call = call;
  }

  get creator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class CreateSubscriptionCall__Outputs {
  _call: CreateSubscriptionCall;

  constructor(call: CreateSubscriptionCall) {
    this._call = call;
  }
}
