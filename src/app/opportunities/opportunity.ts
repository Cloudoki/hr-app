export class Opportunity {
  private status: number;
  private created_by: number;

  constructor(
    
    public title?: string,
    public description?: string,
    public requirements?: string,
    public skills?: string,
    public nice_to_have?: string,
    public perks?: string,
    public location?: string
    //public created?: Date
  ) {
    this.status = 1;
    this.created_by = 1;
    this.title = '';
    this.description = '';
    this.requirements = '';
    this.skills = '';
    this.nice_to_have = '';
    this.perks = '';
    this.location = '';
    //this.created = new Date();
  }
}
