// TODO: add /import User model

export class Session {
	public version:number = 1;
	public authenticationtoken:string = null;
	public user:Object = null;

	constructor(private authService:any) {
	}

	loadEssentialData(callback:Function)
	{
		this.authService.getUserData().subscribe(
			(data:any) => {
				if (callback)
					callback(data);
			},
		  	(err:any) => { let error = err }
		);
		/*this.User = new User();

		this.User.once("activated", function () {	
			callback();
		}.bind(this));
		
		this.User.fetch({error: this.authError.bind(this)});*/
	}

	// Error on API, for example
	authError() {
		this.logout();
	}

	logout() {

		this.authService.logout();

		this.authenticationtoken = null;
		localStorage.removeItem('token');
	}
}