export class User {
  private id: number;

  constructor(
    public name?: string,
    public email?: string,
    public status?: string,
    public location?: string,
    public created?: Date,
    public phone?: string,
    public ratings?: number,
    public image?: string
  ) {
    this.id = new Date().getTime();
    this.name = '';
    this.email = '';
    this.status = 'inactive';
    this.location = '';
    this.created = new Date();
    this.phone = '';
    this.ratings = 0;
  	this.image = 'http://placehold.it/50x50';
  }
}