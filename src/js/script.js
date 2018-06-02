import $ from 'jquery';

$(document).ready(function(){
    //variable caching
    // const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // const date = new Date();   
    // const monthNumber = date.getMonth();
    // const currentMonth = monthNames[monthNumber];
    const errorMessage = $('.error-message');
    const option = $('.option');
    const totalBudget = $('#total_budget');
    const value = $('.value');
    const addValue = $('.add-value');
    const totalIncome = $('.income-header-value');
    const totalExpense = $('.expenses-header-value');
    const incomeColumn = $('.income-col hr');
    const expenseColumn = $('.expense-col hr');
    const totalTitle = $('.total-title');
    let incomeValue = 0;
    let expensesValue = 0;
    let getValue;
    let detectMathSign = '+';
    let totalSum = 0;  
    let financePercentage;
    const expensePercentage = $('.percentage-expense-header');
    let expensePercentageReference;
    const description = $('.description');
    const appTitle = $('#app_title');
    let fieldIncomeValue;
    let fieldExpenseValue;
    let addedElementTrigger = false;
    let addedElementTriggerExpense = false;
    let getDescription;
    let expenseHtmlField;
    let individualExpenseValue;
    let individualExpensePercentage;
    let individualPercentageContainer;
    let individualValueType;
    let individualPercentageType;
    let percentageTypeReference;
    
    
    // ----------------------------------------------------
    
    const DOMSelectionAndInput = {
        monthNames : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        errorMessage: $('.error-message'),
        option: $('.option'),
        totalBudget: $('#total_budget'),
        totalExpense: $('.expenses-header-value'),
        incomeColumn: $('.income-col hr'),
        value: $('.value'),
        expenseColumn: $('.expense-col hr'),
        totalTitle: $('.total-title'),
        expensePercentage: $('.percentage-expense-header'),
        description: $('.description'),
        appTitle: $('#app_title'), 
        addValue: $('.add-value'),
        inputEventsHandling : function(){
            
            let self = this;
            
            //handle the keypresses and error message display when pressing 'up' 'down' and 'minus' sign
            this.value.keydown(function(e) {
                //hide the message when typing other numbers
                if (self.errorMessage.css('display') !== 'none') {
                    self.errorMessage.toggle();
                }
                //display the message when pressing "up", "down" arrows or "-" and "+" symbols
                if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 189 || e.keyCode === 43) {
                    self.errorMessage.html('<h3>No arrows, <strong>"-"</strong> or <strong>"+"</strong> symbols allowed</h3>');
                    self.errorMessage.toggle();
                    return false;
                }
                
                //disable the only key (E) that could be visible inside the number field
                if(e.keyCode === 69) {
                    return false;
                }
            });
            
            self.description.keydown(function(e) {
                if (self.errorMessage.css('display') !== 'none') {
                    self.errorMessage.toggle();
                }
            });
            
            //handle the keypress for the 'shift' and 'plus' sign
            self.value.keypress(function(e) {
                if (e.keyCode === 43) {
                    self.errorMessage.toggle();
                    return false;
                }
            });
            
            //detect select change for the addition or subtraction and set a value for the 'detectMathSign' variable
            self.option.change(function() {
                if ($(this).val() === '-') {
                    detectMathSign = '-';   
                    console.log(detectMathSign);                 
                } 
                else {
                    detectMathSign = '+';
                    console.log(detectMathSign);
                }
            });
            
            $(window).keypress(function(e){
                if(e.keyCode === 13){
                    self.description.focus();
                    valueProcessing();
                }
            });
        }        
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
        constructor(entryType){
            this.getValue = DOMSelectionAndInput.value.val();
            this.getDescription = DOMSelectionAndInput.description.val();
            this.detectMathSign = '+';
        }

        valueProcessing(){
            DOMSelectionAndInput.totalTitle.addClass('full-opacity');

            //display an error if the description and value field are left empty
        if (this.getValue == '' || this.getDescription == '') {
            DOMSelectionAndInput.errorMessage.html('<h3>Please type in a value and a description</h3>');
            DOMSelectionAndInput.errorMessage.toggle();

            //focus on the field that needs to be completed if left empty
            if (DOMSelectionAndInput.description.val() == '') {
                DOMSelectionAndInput.description.focus();
            } else if (DOMSelectionAndInput.value.val() == '') {
                DOMSelectionAndInput.value.focus();
            }
            return;
        }
        this.getValue = parseInt(this.getValue);

        //handle the income sum
        if (this.detectMathSign === '+') {
            console.log('here');
            // incomeValue += getValue;
            // totalSum += getValue;
            // totalBudget.html('');
            // totalIncome.html('');
            // totalBudget.prepend('<span class="total-sum">' + totalSum + '<span>');
            // totalIncome.prepend('+ '+ incomeValue);

            // //insert the html for the section in the column
            // incomeColumn.after('<div class="section-wrapper-1"><div class="income-field"><div class="income-description">' + getDescription + '</div><div class="income-value-wrapper clearfix"><div class="income-value"><span class="plus-sign"></span><span>+ ' + getValue + '</span></div><div class="percentage-income">10%</div><i class="fa fa-times-circle-o circle-blue" aria-hidden="true"></i></div></div><hr></div>');


            // //reveal the section smoothly
            // setTimeout(function(){
            //     $('.section-wrapper-1').addClass('full-opacity');
            // },100)


            // //remove the income section when clicking on its corresponding "X" button and update the values from the header field and the total budget number
            // $('.circle-blue').click(function(){

            //     if(addedElementTrigger) {
            //         return;
            //     } else {

            //         addedElementTrigger = true;

            //         sectionRemovalUpdates('income', $(this));

            //         //remove the income section
            //         removeSectionWrapper($(this), '.section-wrapper-1');

            //     };

            //     //set a Timeout to change the trigger's value.
            //     //This is used to stop the function from running multiple times
            //     //a forEach, a regular loop or a function factory method will not work due to the dynamic html element insertion
            //     setTimeout(function(){
            //         addedElementTrigger = false;
            //     },100)

            //     updateMainPercentage();
            // });

            // updateMainPercentage();

            // applyPadding($('.section-wrapper-1'),$('.income-value span'), 'padding-class');

            // displayPercentageIncome();
        }
        }
    }

    // const operations = new OperationsClass();
    // operations.displayMonth();

    class IncomeObject extends OperationsClass {
   
    }

    class ExpenseObject extends OperationsClass {

    }

    const mathOperationsObject = {
        getValue: DOMSelectionAndInput.value.val(),
        totalSum : 0,
        financePercentage: '',
        getDescription: '',
        detectMathSign: '+',        
        individualPercentageContainer: '',
        individualPercentageType: '',
        bindEvents: function(){
            // DOMSelectionAndInput.addValue.click(this.valueProcessing);
        },
        // valueProcessing: function(){
            // let self = this;
            // var getValue = DOMSelectionAndInput.value.val();
            // DOMSelectionAndInput.totalTitle.addClass('full-opacity');
            // console.log(getValue);
        // }
    };

    // PageSetup.displayMonth();
    DOMSelectionAndInput.inputEventsHandling();
    // mathOperationsObject.addValueEvent();
   


//register the values and start segmenting after a click or after a carriage return (Enter)
    addValue.click(valueProcessing);

    function valueProcessing() {

        getValue = value.val();
        getDescription = description.val();
        totalTitle.addClass('full-opacity');
        //display an error if the description and value field are left empty
        if (getValue == '' || getDescription == '') {
            errorMessage.html('<h3>Please type in a value and a description</h3>');
            errorMessage.toggle();
            //focus on the field that needs to be completed if left empty
            if (description.val() == '') {
                description.focus();
            } else if (value.val() == '') {
                value.focus();
            }
            return;
        }
        getValue = parseInt(getValue);

        //handle the income sum
        if (detectMathSign === '+') {

            incomeValue += getValue;
            totalSum += getValue;
            totalBudget.html('');
            totalIncome.html('');
            totalBudget.prepend('<span class="total-sum">' + totalSum + '<span>');
            totalIncome.prepend('+ '+ incomeValue);

            //insert the html for the section in the column
            incomeColumn.after('<div class="section-wrapper-1"><div class="income-field"><div class="income-description">' + getDescription + '</div><div class="income-value-wrapper clearfix"><div class="income-value"><span class="plus-sign"></span><span>+ ' + getValue + '</span></div><div class="percentage-income">10%</div><i class="fa fa-times-circle-o circle-blue" aria-hidden="true"></i></div></div><hr></div>');


            //reveal the section smoothly
            setTimeout(function(){
                $('.section-wrapper-1').addClass('full-opacity');
            },100)


            //remove the income section when clicking on its corresponding "X" button and update the values from the header field and the total budget number
            $('.circle-blue').click(function(){

                if(addedElementTrigger) {
                    return;
                } else {

                    addedElementTrigger = true;

                    sectionRemovalUpdates('income', $(this));

                    //remove the income section
                    removeSectionWrapper($(this), '.section-wrapper-1');

                };

                //set a Timeout to change the trigger's value.
                //This is used to stop the function from running multiple times
                //a forEach, a regular loop or a function factory method will not work due to the dynamic html element insertion
                setTimeout(function(){
                    addedElementTrigger = false;
                },100)

                updateMainPercentage();
            });

            updateMainPercentage();

            applyPadding($('.section-wrapper-1'),$('.income-value span'), 'padding-class');

            displayPercentageIncome();
        }

        //handle the expense sum
        else {
            expensesValue += getValue;
            //update the top percentage on the hero(jumbotron top section)

            expenseHtmlField = '<div class="section-wrapper-2"><div class="expenses-field"><div class="expenses-description">' + getDescription + '</div><div class="expense-value-wrapper"><div class="expenses-value"><span class="minus-sign"></span><span>- ' + getValue + '</span></div><div class="percentage-expense"></div><i class="fa fa-times-circle-o circle-orange" aria-hidden="true"></i></div></div><hr></div>';
            financePercentage = ((expensesValue / incomeValue) * 100).toFixed(2);
            totalExpense.html('');
            totalExpense.html('- ' + expensesValue);
            totalBudget.html('');
            totalSum -= getValue;
            expenseColumn.after(expenseHtmlField);

            setTimeout(function(){
                $('.section-wrapper-2').addClass('full-opacity');
            },100)


            //remove the entire section when clicking on the corresponding "X" button
            $('.circle-orange').click(function() {

                //control flow trigger construction
                if(addedElementTriggerExpense) {
                    return;
                } else {

                    addedElementTriggerExpense = true;

                    sectionRemovalUpdates('expense', $(this));

                    removeSectionWrapper($(this), '.section-wrapper-2');

                };

                //set a Timeout to change the trigger's value.
                //This is used to stop the function from running multiple times
                //a forEach, a regular loop or a function factory method will not work due to the dynamic html element insertion
                setTimeout(function(){
                    addedElementTriggerExpense = false;
                },100)

                updateMainPercentage();

            });

            updateMainPercentage();

            //apply padding when hovering over one of the expense fields
            applyPadding($('.section-wrapper-2'), $('.expenses-value'),'padding-class');

            //display an individual percentage for every expense item
            displayPercentageExpense();


            //conditions for percentage reveal
            if (totalSum > 0) {
                totalBudget.prepend('+' + totalSum);
                expensePercentage.addClass('full-opacity');
                expensePercentage.html(financePercentage + ' %');


            } else if (totalSum < 0) {
                totalBudget.prepend(totalSum);
            }


        }

        //empty the two fields after submitting the value
        value.val(' ');
        description.val(' ');
    }


//trigger a small padding increase when hovering over a section
    function applyPadding(paddedElement, correspondingValue, className) {
        paddedElement.eq(0).hover(function(){
            $(this).find(correspondingValue).toggleClass(className);

        });
    }

    function updateMainPercentage () {
        if (incomeValue > expensesValue) {
            financePercentage = ((expensesValue / incomeValue) * 100).toFixed(2);
            expensePercentage.html(financePercentage + ' %');
            expensePercentage.addClass('full-opacity');
        } else {
            expensePercentage.removeClass('full-opacity');
        }
        
    }

    function sectionRemovalUpdates(valueType, referenceElement){

        if(valueType === 'income'){

            //get the actual primitive value type, the number in the section
            fieldIncomeValue = parseInt(referenceElement.parent().find('span')[1].innerText.split(' ')[1]);

            //subtract the section specific value from the total stored income value
            incomeValue -= fieldIncomeValue;

            if(incomeValue === 0) {
                totalIncome.html(incomeValue);
            } else {
                totalIncome.html('+ ' + incomeValue);
            }

            //subtract the section value from the "total" value
            totalSum -= fieldIncomeValue;
            totalBudget.html(totalSum);
            

            if(expensePercentageReference > 0) {
                expensePercentage.addClass('full-opacity');
            }

        } else if(valueType ==='expense') {

            //get the actual primitive value type, the number in the section
            fieldExpenseValue = parseInt(referenceElement.parent().find('span')[1].innerText.split(' ')[1]);

            //subtract the section value from the total expense value
            expensesValue -= fieldExpenseValue;

            if(expensesValue === 0) {
                totalExpense.html(expensesValue);
            } else {
                totalExpense.html('+ ' + expensesValue);
            }
            //add the section value to the "total"
            totalSum += fieldExpenseValue;
            totalBudget.html(totalSum);
        }
    }

    function displayPercentageIncome(){
        $('.section-wrapper-1').eq(0).hover(function(){


            individualValueType = $(this).find('.income-value');

            individualValueType = individualValueType.text().toString().split(' ')[1];
            // console.log(individualValueType);

            individualPercentageContainer = $(this).find('.percentage-income');
            individualPercentageContainer.toggleClass('full-opacity');

            individualPercentageType = (individualValueType/incomeValue * 100).toFixed(2);
            // expensePercentageReference = individualExpensePercentage;

            //hide the percentage if this is bigger than 100
            if(individualPercentageType > 100){
                individualPercentageContainer.toggleClass('full-opacity');
            } else {
                individualPercentageType += '%';
            }

            individualPercentageContainer.html(individualPercentageType)
        });
    }


    function displayPercentageExpense(){


        $('.section-wrapper-2').eq(0).hover(function(){


            console.log(1);

            individualValueType = $(this).find('.expenses-value');

            console.log(individualValueType);
            individualValueType = individualValueType.text().toString().split(' ')[1];

            individualPercentageContainer = $(this).find('.percentage-expense');
            individualPercentageContainer.toggleClass('full-opacity');

            individualPercentageType = (individualValueType/expensesValue * 100).toFixed(2);
            // expensePercentageReference = individualExpensePercentage;

            //hide the percentage if this is bigger than 100
            if(individualPercentageType > 100){
                individualPercentageContainer.toggleClass('full-opacity');
            } else {
                individualPercentageType += '%';
            }

            individualPercentageContainer.html(individualPercentageType)
        });
    }

    function removeSectionWrapper(referenceElement, wrapperSection){
        referenceElement.closest(wrapperSection).remove();
    }

});
