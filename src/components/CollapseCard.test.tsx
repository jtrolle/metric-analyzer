
import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import CollapseCard from './CollapseCard';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('Collapse Card', function () {

    it('should mount an opened Card', async function () {
        const isOpen = true;
        const { container } = render(
            <CollapseCard title="Card title" isOpen={isOpen}>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </CollapseCard >
        );

        const card = container.querySelector('.card');
        const collapse = container.querySelector('.collapse');
        const cardTitle = container.querySelector('.card-title');


        expect(card).toHaveClass('card', 'card--collapse');
        expect(cardTitle).not.toBeNull();
        expect(cardTitle ? cardTitle.innerHTML : null).toBe('Card title');
        expect(collapse).toHaveClass('show');

    })


    it('should mount an closed Card', async function () {
        const isOpen = false;
        const { container } = render(
            <CollapseCard title="Card title" isOpen={isOpen}>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </CollapseCard >
        );
        const collapse = container.querySelector('.collapse');

        expect(collapse).not.toHaveClass('show');

    })

    it('should toogle component', async function () {
        const isOpen = false;
        const { container } = render(
            <CollapseCard title="Card title" isOpen={isOpen}>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </CollapseCard >
        );
        const collapse = container.querySelector('.collapse');
        expect(collapse).not.toHaveClass('show');
        const cardHeader = container.querySelector('.card-header');
        expect(cardHeader).not.toBeNull();

        if (cardHeader) {
            fireEvent.click(cardHeader);
            setTimeout(function() {
                expect(collapse).toHaveClass('show');
            }, 300);
        }

    })
})