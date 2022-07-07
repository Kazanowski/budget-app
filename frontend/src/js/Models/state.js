import { dateFilterNames } from "../constants";

export const state = {
    setLoggedUserID: (id) => sessionStorage.setItem("loggedUserID", id),
    getLoggedUserID: () => sessionStorage.getItem("loggedUserID"),
    setAllTransactions: (transactions) => sessionStorage.setItem("allTransactions", JSON.stringify(transactions)),
    getAllTransactions: () => JSON.parse(sessionStorage.getItem("allTransactions")),
    setFilteredTransactions: (transactions) => sessionStorage.setItem("filteredTransactions", JSON.stringify(transactions)),
    getFilteredTransactions: () => JSON.parse(sessionStorage.getItem("filteredTransactions")),
    setDateFilterName: (filterName) =>  sessionStorage.setItem("dateFilterName", filterName),
    getDateFilterName: () =>  sessionStorage.getItem("dateFilterName"),
    setFilterTypeAndCategory: (filter) => sessionStorage.setItem("filterTypeAndCategory", JSON.stringify(filter)),
    getFilterTypeAndCategory: () => JSON.parse(sessionStorage.getItem("filterTypeAndCategory")),
    getTransaction: (id) => {
        return state.getAllTransactions().filter(transaction => transaction.id === id);
    },

    getDateFilterNames: () => {
        const filterNames = {
            options: [...dateFilterNames.options],
            default: state.getDateFilterName() || dateFilterNames.default 
        }
        filterNames.options.splice(filterNames.options.length - 1, 0, ...state.getYears())
        return filterNames;
    },

    getYears: () =>{
        const years = [];
        state.getAllTransactions().forEach(el => {
            years.push(`${new Date(el.date).getFullYear()}`);
        });
        return [...new Set(years)];
    },

    clear: () => {
        sessionStorage.removeItem("loggedUserID");
        sessionStorage.removeItem("allTransactions");
        sessionStorage.removeItem("filteredTransactions");
        sessionStorage.removeItem("dateFilterName");
        sessionStorage.removeItem("filterTypeAndCategory");
    }
}

