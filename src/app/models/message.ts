export class Message {
  public id: number;
  public toUserId: string;
  public message: string;
  public backgroundType: number;
  public timestamp: Date;

  constructor(id: number, toUserId: string, message: string, type: number, timestamp: Date) {
    this.id = id;
    this.toUserId = toUserId;
    this.message = message;
    this.backgroundType = type;
    this.timestamp = timestamp;
  }
}
