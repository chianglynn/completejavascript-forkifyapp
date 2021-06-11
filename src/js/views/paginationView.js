import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcel 2

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        if (curPage === 1 && numPages > 1) return this._generateMarkupNextBtn(curPage)

        if (curPage === numPages && numPages > 1) return this._generateMarkupPreBtn(curPage)

        if (curPage < numPages) {
            return `
                ${this._generateMarkupPreBtn(curPage)}
                ${this._generateMarkupNextBtn(curPage)}
            `;
        }

        return '';
    }

    _generateMarkupNextBtn(curPage) {
        return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    }

    _generateMarkupPreBtn(curPage) {
        return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
        `;
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const gotoPage = +btn.dataset.goto;
            handler(gotoPage);
        });
    }
}

export default new PaginationView();