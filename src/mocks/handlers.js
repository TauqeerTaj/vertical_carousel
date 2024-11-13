import { rest } from 'msw';

export const handlers = [
    // Mock POST request
    rest.post('https://carousel-task-851ad-default-rtdb.europe-west1.firebasedatabase.app/carousel.json', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'Data successfully submitted!',
            })
        );
    }),
];
