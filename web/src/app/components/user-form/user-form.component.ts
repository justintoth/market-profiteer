import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { TradeService } from 'src/app/services/trade.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  signinFormIsVisible = false;
  signupFormIsVisible = false;
  isAuthenticated = false;
  model = new User();
  @ViewChild("emailAddress") emailAddressField: ElementRef;

  constructor(
    private userService: UserService, 
    private tradeService: TradeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.userService.getAuthenticatedUser() != null;
  }

  onShowSigninForm() {
    this.signinFormIsVisible = true;
    // Set focus.
    setTimeout(() => { this.emailAddressField.nativeElement.focus(); });
  }

  onShowSignupForm() {
    this.signupFormIsVisible = true;
    // Set focus.
    setTimeout(() => { this.emailAddressField.nativeElement.focus(); });
  }

  onSubmit() {
    this.signinFormIsVisible ? 
      this.onSignin() : 
      this.onSignup();
  }

  onSignin() {
    const userSubscription = this.userService.authenticate(this.model)
      .subscribe(userResult => {
        if (userResult) {
          this.isAuthenticated = true;
          this.signinFormIsVisible = false;
          this.toastr.success('You have been signed in.', 'Success!');
          // Refresh trades.
          const tradeSubscription = this.tradeService.getAll()
            .subscribe(result => {
              tradeSubscription.unsubscribe();
            });
        } else
          this.toastr.error('Your signin credentials are incorrect.', 'Error!');
        userSubscription.unsubscribe();
      });
  }

  onSignup() {
    const userSubscription = this.userService.save(this.model)
      .subscribe(userResult => {
        this.isAuthenticated = true;
        this.signupFormIsVisible = false;
        this.toastr.success('You have been signed up.', 'Success!');
        userSubscription.unsubscribe();
        const tradeSubscription = this.tradeService.saveAllFromStorage()
          .subscribe(tradesResult => {
            this.toastr.success('Your trades have been copied over to your new account.', 'Migrated!');
            tradeSubscription.unsubscribe();
          })
      });
  }

  onSignOut() {
    this.userService.signOut();
    this.isAuthenticated = false;
    // Refresh trades.
    const tradeSubscription = this.tradeService.getAll()
      .subscribe(result => {
        //tradeSubscription.unsubscribe();
      });
  }

  hideForm() {
    this.signinFormIsVisible = this.signupFormIsVisible = false;
  }

}
