import $ from 'jquery';

$(document).ready(function(){
    
    const DOMSelectionAndInput = {
        monthNames : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        errorMessage: $('.error-message'),
        option: $('.option'),
        totalBudget: $('#total_budget'),
        totalExpense: $('.expenses-header-value'),
        totalIncome: $('.income-header-value'),
        incomeColumn: $('.income-col hr'),
        value: $('.value'),
        expenseColumn: $('.expense-col hr'),
        totalTitle: $('.total-title'),
        expensePercentage: $('.percentage-expense-header'),
        description: $('.description'),
        appTitle: $('#app_title'), 
        addValue: $('.add-value'),      
    };
    
    //make the properties of an object readOnly
    // -----------------------------------------------------------
    const privateMethod1 = Symbol();
    class PageSetup {
        constructor(objectToLooOver){
            this[privateMethod1] = () => {
                for(const key in objectToLooOver) {
                    if(objectToLooOver.hasOwnProperty(key))
                    Object.defineProperty(objectToLooOver, key, {
                        writable: false
                    });
                }
            };
        }
        displayMonth() {
            let monthNumber = new Date().getMonth();
            let currentMonth = DOMSelectionAndInput.monthNames[monthNumber];            
            DOMSelectionAndInput.appTitle.append(currentMonth);
            DOMSelectionAndInput.description.focus();
        } 
    };
    
    const setupPage = new PageSetup(DOMSelectionAndInput);
    setupPage[privateMethod1]();
    setupPage.displayMonth();

    //this class wil only get methods on the prototype ; this is the parent class
    class OperationsClass {
        constructor(){

            this.mathSign = '+';
            this.incomeValue = 0;
            this.expensesValue = 0;
            this.addedElementTrigger = false;
            this.addedElementTriggerExpense = false;
            this.fieldIncomeValue = 0;
            this.fieldExpenseValue = 0;
            this.totalSum = 0;
            this.individualValueType = '';
            this.individualPercentageContainer = '';
            this.individualPercentageType = '';
        }

        signListHandling() {
            
            let self = this;
            //handle the keypresses and error message display when pressing 'up' 'down' and 'minus' sign
            DOMSelectionAndInput.value.keydown(function(e) {
                //hide the message when typing other numbers
                if (DOMSelectionAndInput.errorMessage.css('display') !== 'none') {
                    DOMSelectionAndInput.errorMessage.toggle();
                }
                //display the message when pressing "up", "down" arrows or "-" and "+" symbols
                if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 189 || e.keyCode === 43) {
                    DOMSelectionAndInput.errorMessage.html('<h3>No arrows, <strong>"-"</strong> or <strong>"+"</strong> symbols allowed</h3>');
                    DOMSelectionAndInput.errorMessage.toggle();
                    return false;
                }
                
                //disable the only key (E) that could be visible inside the number field
                if(e.keyCode === 69) {
                    return false;
                }
            });
            
            DOMSelectionAndInput.description.keydown(function(e) {
                if (DOMSelectionAndInput.errorMessage.css('display') !== 'none') {
                    DOMSelectionAndInput.errorMessage.toggle();
                }
            });
            
            //handle the keypress for the 'shift' and 'plus' sign
            DOMSelectionAndInput.value.keypress(function(e) {
                if (e.keyCode === 43) {
                    DOMSelectionAndInput.errorMessage.toggle();
                    return false;
                }
            });
            
            //detect select change for the addition or subtraction and set a value for the 'detectMathSign' variable
            DOMSelectionAndInput.option.change(function() {
                if ($(this).val() === '-') {
                    self.mathSign = '-';
                } 
                else {
                    self.mathSign = '+';
                }
            });
        } 
        //trigger a small padding increase when hovering over a section
         applyPadding(paddedElement, correspondingValue, className) {
            paddedElement.eq(0).hover(function(){
            $(this).find(correspondingValue).toggleClass(className);
        });
    }

        displayPercentageIncome() {

            let self = this;

            $('.section-wrapper-1').eq(0).hover(function(){
    
                self.individualValueType = $(this).find('.income-value');
                self.individualValueType = Number(self.individualValueType.text());

                self.individualPercentageContainer = $(this).find('.percentage-income');
                self.individualPercentageContainer.toggleClass('full-opacity');
    
                self.individualPercentageType = (self.individualValueType/self.incomeValue * 100).toFixed(2);
    
                //hide the percentage if this is bigger than 100
                if(self.individualPercentageType > 100){
                    self.individualPercentageContainer.toggleClass('full-opacity');
                } else {
                    self.individualPercentageType += '%';
                }
    
                self.individualPercentageContainer.html(self.individualPercentageType);

            });
        } 

        displayPercentageExpense() {

            let self = this;

            $('.section-wrapper-2').eq(0).hover(function(){

                self.individualValueType = $(this).find('.expenses-value');
                self.individualValueType = Number(self.individualValueType.text());
    
                self.individualPercentageContainer = $(this).find('.percentage-expense');
                self.individualPercentageContainer.toggleClass('full-opacity');
    
                self.individualPercentageType = (self.individualValueType/self.expensesValue * 100).toFixed(2).split('-').join(' ');
    
                //hide the percentage if this is bigger than 100
                if(self.individualPercentageType > 100){
                    self.individualPercentageContainer.toggleClass('full-opacity');
                } else {
                    self.individualPercentageType += '%';
                }

                self.individualPercentageContainer.html(self.individualPercentageType);
                
            });
        }

        updateMainPercentage () {
            if (this.incomeValue > this.expensesValue) {
                this.financePercentage = ((this.expensesValue / this.incomeValue) * 100).toFixed(2);
                DOMSelectionAndInput.expensePercentage.html(this.financePercentage + ' %');
                DOMSelectionAndInput.expensePercentage.addClass('full-opacity');
            } else {
                DOMSelectionAndInput.expensePercentage.removeClass('full-opacity');
            }
            
        }

        removeSectionWrapper(referenceElement, wrapperSection) {
            referenceElement.closest(wrapperSection).remove();
        }

        sectionRemovalUpdates(valueType, referenceElement){

            let self = this;

            if(valueType === 'income'){
    
                //get the actual primitive value type, the number in the section
                self.fieldIncomeValue = Number(referenceElement.parent().find('span')[1].innerText);
                //subtract the section specific value from the total stored income value
                this.incomeValue -= this.fieldIncomeValue;
    
                if(this.incomeValue === 0) {
                    DOMSelectionAndInput.totalIncome.html((this.incomeValue).toFixed(2));
                } else {
                    DOMSelectionAndInput.totalIncome.html(`+${(this.incomeValue).toFixed(2)}`);
                }
    
                //subtract the section value from the "total" value
                this.totalSum -= this.fieldIncomeValue;
                DOMSelectionAndInput.totalBudget.html((this.totalSum).toFixed(2));
    
            } 
            else if(valueType ==='expense') {
    
                //get the actual primitive value type, the number in the section
                self.fieldExpenseValue = Number(referenceElement.parent().find('span')[1].innerText);
    
                //subtract the section value from the total expense value
                this.expensesValue += this.fieldExpenseValue;
    
                if(this.expensesValue === 0) {
                    DOMSelectionAndInput.totalExpense.html(this.expensesValue.toFixed(2));
                } else {
                    DOMSelectionAndInput.totalExpense.html(`- ${this.expensesValue.toFixed(2)}`);
                }
                //add the section value to the "total"
                this.totalSum -= this.fieldExpenseValue;
                DOMSelectionAndInput.totalBudget.html(this.totalSum);
            }
        }


        valueProcessing() {

            let self = this;
            let getValue;
            let getDescription;
            let expensesValue = 0;
            let financePercentage;
            let expenseHtmlField;
            let individualValueType;
            let individualPercentageContainer;
            let individualPercentageType;

            //event binding for the blue tick button
            DOMSelectionAndInput.addValue.click(function(){

                getValue = DOMSelectionAndInput.value.val();
                getDescription = DOMSelectionAndInput.description.val();
                DOMSelectionAndInput.totalTitle.addClass('full-opacity');

                //show an error message if one of the input fields is empty
                if (getValue == '' || getDescription == '') {
                    DOMSelectionAndInput.errorMessage.html(`<h3>Please type in a value and a description</h3>`);
                    DOMSelectionAndInput.errorMessage.toggle();
        
                    //focus on the field that needs to be completed if left empty
                    if (DOMSelectionAndInput.description.val() == '') {
                        DOMSelectionAndInput.description.focus();
                    } else if (DOMSelectionAndInput.value.val() == '') {
                        DOMSelectionAndInput.value.focus();
                    }
                    return;
                } else {

                    //handle the income sum
                        if (self.mathSign === '+') {
                           
                            self.incomeValue += Number(getValue);
                            self.totalSum += Number(getValue);

                            DOMSelectionAndInput.totalBudget.html('');
                            DOMSelectionAndInput.totalIncome.html('');
                            DOMSelectionAndInput.totalBudget.prepend(`<span class="total-sum">${self.totalSum.toFixed(2)}<span>`);
                            DOMSelectionAndInput.totalIncome.prepend(`+ ${self.incomeValue.toFixed(2)}`);

                            //insert the html for the section in the column
                           DOMSelectionAndInput.incomeColumn.after(`
                            <div class="section-wrapper-1">
                                <div class="income-field">
                                    <div class="income-description"> ${getDescription}</div>
                                    <div class="income-value-wrapper clearfix">
                                        <div class="income-value">
                                            <span class="plus-sign"></span>
                                            <span>${getValue}</span>
                                        </div>
                                    <div class="percentage-income">
                                        10%
                                    </div>
                                    <i class="fa fa-times-circle-o circle-blue" aria-hidden="true"></i>
                                    </div>
                                </div>
                            <hr>
                            </div>`);

                            setTimeout(function(){
                                $('.section-wrapper-1').addClass('full-opacity');
                            },100);

                            //remove the income section when clicking on its corresponding "X" button and update the values from the header field and the total budget number
                            
                            $('.circle-blue').click(function(){
                                
                                if(self.addedElementTrigger) {
                                    return;
                                } else {
                                    
                                    self.addedElementTrigger = true;
                                    
                                    self.sectionRemovalUpdates('income', $(this));
                                    
                                    //remove the income section
                                    self.removeSectionWrapper($(this), '.section-wrapper-1');
                
                                }
                
                                //set a Timeout to change the trigger's value.
                                //This is used to stop the function from running multiple times
                                //a forEach, a regular loop or a function factory method will not work due to the dynamic html element insertion
                                setTimeout(function(){
                                    self.addedElementTrigger = false;
                                },100);
                                
                                self.updateMainPercentage();
                            });
                            
                            self.updateMainPercentage();
                            self.applyPadding($('.section-wrapper-1'),$('.income-value span'), 'padding-class');
                            self.displayPercentageIncome();

                            //handle the expense
                        }  else {
                            self.expensesValue += Number(getValue);
                            self.totalSum -= Number(getValue);                            
                            self.expenseHtmlField = `
                            <div class="section-wrapper-2">
                            <div class="expenses-field">
                            <div class="expenses-description">${getDescription}</div>
                            <div class="expense-value-wrapper">
                            <div class="expenses-value">
                            <span class="minus-sign"></span><span>-${getValue}</span>
                            </div>
                            <div class="percentage-expense"></div>
                            <i class="fa fa-times-circle-o circle-orange" aria-hidden="true"></i>
                            </div>
                            </div>
                            <hr>
                            </div>`;

                            //update the top percentage on the hero(jumbotron top section)
                            self.financePercentage = ((self.expensesValue / self.incomeValue) * 100).toFixed(2);
                            DOMSelectionAndInput.totalExpense.html('');
                            DOMSelectionAndInput.totalExpense.html(`- ${self.expensesValue.toFixed(2)}`);
                            DOMSelectionAndInput.totalBudget.html('');
                            DOMSelectionAndInput.expenseColumn.after(self.expenseHtmlField);
                
                            setTimeout(function(){
                                $('.section-wrapper-2').addClass('full-opacity');
                            },100)

                            $('.circle-orange').click(function() {

                                //control flow trigger construction
                                if(self.addedElementTriggerExpense) {
                                    return;
                                } else {
                                    self.addedElementTriggerExpense = true;
                                    self.sectionRemovalUpdates('expense', $(this));
                                    self.removeSectionWrapper($(this), '.section-wrapper-2');
                                };
                
                                //set a Timeout to change the trigger's value.
                                //This is used to stop the function from running multiple times
                                //a forEach, a regular loop or a function factory method will not work due to the dynamic html element insertion
                                setTimeout(function(){
                                    self.addedElementTriggerExpense = false;
                                },100)
                
                                self.updateMainPercentage();
                
                            });
                            
                            self.updateMainPercentage();
                            self.applyPadding($('.section-wrapper-2'),$('.expenses-value'), 'padding-class');
                            self.displayPercentageExpense();

                             //conditions for percentage reveal
                            if (self.totalSum > 0) {
                                DOMSelectionAndInput.totalBudget.prepend(`+${self.totalSum.toFixed(2)}`);
                                DOMSelectionAndInput.expensePercentage.addClass('full-opacity');
                                DOMSelectionAndInput.expensePercentage.html(`${self.financePercentage} %`);

                            } else if (self.totalSum < 0) {
                                DOMSelectionAndInput.totalBudget.prepend(self.totalSum.toFixed(2));
                            }
                        }

                    //empty the two fields after submitting the value
                    DOMSelectionAndInput.value.val(' ');
                    DOMSelectionAndInput.description.val(' ');
                }
            });
        }  
    }
    
    const operations = new OperationsClass();
    operations.signListHandling();
    operations.valueProcessing();
    
});
