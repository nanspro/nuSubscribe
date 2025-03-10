// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Creator extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Creator entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Creator entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Creator", id.toString(), this);
  }

  static load(id: string): Creator | null {
    return store.get("Creator", id) as Creator | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get postsIpfsHash(): Array<string> {
    let value = this.get("postsIpfsHash");
    return value.toStringArray();
  }

  set postsIpfsHash(value: Array<string>) {
    this.set("postsIpfsHash", Value.fromStringArray(value));
  }

  get membershipFees(): BigInt {
    let value = this.get("membershipFees");
    return value.toBigInt();
  }

  set membershipFees(value: BigInt) {
    this.set("membershipFees", Value.fromBigInt(value));
  }

  get policyPubkey(): string {
    let value = this.get("policyPubkey");
    return value.toString();
  }

  set policyPubkey(value: string) {
    this.set("policyPubkey", Value.fromString(value));
  }

  get aliceSigPubkey(): string {
    let value = this.get("aliceSigPubkey");
    return value.toString();
  }

  set aliceSigPubkey(value: string) {
    this.set("aliceSigPubkey", Value.fromString(value));
  }

  get label(): string {
    let value = this.get("label");
    return value.toString();
  }

  set label(value: string) {
    this.set("label", Value.fromString(value));
  }

  get address(): string {
    let value = this.get("address");
    return value.toString();
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }

  get members(): Array<string> {
    let value = this.get("members");
    return value.toStringArray();
  }

  set members(value: Array<string>) {
    this.set("members", Value.fromStringArray(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get bio(): string {
    let value = this.get("bio");
    return value.toString();
  }

  set bio(value: string) {
    this.set("bio", Value.fromString(value));
  }
}

export class Membership extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Membership entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Membership entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Membership", id.toString(), this);
  }

  static load(id: string): Membership | null {
    return store.get("Membership", id) as Membership | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get creator(): string {
    let value = this.get("creator");
    return value.toString();
  }

  set creator(value: string) {
    this.set("creator", Value.fromString(value));
  }

  get status(): string {
    let value = this.get("status");
    return value.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }
}

export class Subscriber extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Subscriber entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Subscriber entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Subscriber", id.toString(), this);
  }

  static load(id: string): Subscriber | null {
    return store.get("Subscriber", id) as Subscriber | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): string {
    let value = this.get("address");
    return value.toString();
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }

  get subscribed(): Array<string> {
    let value = this.get("subscribed");
    return value.toStringArray();
  }

  set subscribed(value: Array<string>) {
    this.set("subscribed", Value.fromStringArray(value));
  }
}
