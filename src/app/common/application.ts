import {APP_DATA} from './config';
import {Session} from './session';

export class Application {
	private version:number = 1;
	private authentication:boolean = true;
	public api:string;
	public session:Session;
	public userProfile:number;

	constructor() {}

	init(authService:any)
	{
		// Load configs
		this.userProfile = 2; // (1) - consultancy (2) - CLoudoki
		this.api = APP_DATA.apiurl;	
		this.session = new Session(authService);

		if (this.authentication) {
			this.authenticate();
			this.loadUserData();
		}
		else 
			this.begin();

		// authService.getUserData().subscribe(
		// 	(data:any) => { this.userProfile = data.profile; },
		//   	(err:any) => { let error = err }
		// );
	}

	// Oauth2 Authentication
	authenticate() {

		var token = window.localStorage.getItem('token');

		//Check if there is authentication
		if(token && token.length > 9)
		{	
			this.session.authenticationtoken = token;

		} else{ console.log("token error", token); window.location.href = window.location.pathname+"login.html";}
	}

	// Get User data after authentication;
	loadUserData() {

		this.session.loadEssentialData ((data:any)=> {
			console.log(data);
			// this.begin();
		});
	}

	isAuthenticated() {

		var token = window.localStorage.getItem('token');

		//Check if there is authentication
		return (token && token.length > 9);
	}

	// Callbak function after user authentication
	begin() {

		$('body').addClass('loaded').removeClass('loading');

		// Root view
		/*Application.RootView = new RootView();				
		Application.RootView.renderNav();

		// Init roles
		Application.RootView.initRoles();		

		// Router
		Application.Router = new Router ();

		Backbone.history.start();*/
	}
}