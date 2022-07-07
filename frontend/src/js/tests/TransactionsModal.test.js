import TransactionsModel from './../Models/TransactionsModel';

const transactions = [
    {
        id: "d9b03586-565b-413d-9b46-b1b8d20c96a4",
        userID: "453d6072-0605-47da-87fa-1309eab74711",
        type: "expense",
        date: "2021-10-12",
        category: "bill",
        description: "Renting an apartment",
        amount: 1000
    },
    {
        id: "d56c5252-87b8-4b18-91e3-a2726071945a",
        userID: "453d6072-0605-47da-87fa-1309eab74711",
        type: "expense",
        date: "2021-23-12",
        category: "clothes",
        description: "Shoes",
        amount: 100
    },
    {
        id: "18953cf3-eec5-4f74-8318-040e91184152",
        userID: "453d6072-0605-47da-87fa-1309eab74711",
        type: "income",
        date: "2021-10-12",
        category: "work",
        description: "Payment",
        amount:	5000
    }
];


test('count sum incomes and expenses', () => {
    const result = {
        incomes: 5000,
        expenses: 1100
    }
    expect(TransactionsModel.countSumIncomesAndExpenses(transactions)).toEqual(result);
});

test('filter transactions by type and category', () =>{
    const filter = {
        type: 'income',
        category: 'work'
    };
    expect(TransactionsModel.filterByTypeAndCategory(transactions, filter)).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: "18953cf3-eec5-4f74-8318-040e91184152"
            })
        ])
    );
    expect(TransactionsModel.filterByTypeAndCategory(transactions, filter)).toHaveLength(1);
})

