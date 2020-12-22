export class FormService {
  
  public submitListeners: (()=>void)[] = [];
  addSubmitListener(
    listener: ()=>void
  ) {
    this.submitListeners.push(listener);
  }
  submit() {
    this.submitListeners.forEach(listener => {
      listener();
    });
  }
}