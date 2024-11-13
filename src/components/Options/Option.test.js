import { fireEvent, render, screen } from "@testing-library/react";
import Options from ".";

test('Check option icons',
    () => {
        render(<Options item={
            {
                image: "like.webp",
                label: "Good"
            }
        } summary={[{
            question: 'test case check',
            answer: 'yes'
        }]}
            data={[
                {
                    introline: 'check question'
                }
            ]}
            activeIndex={0}
        />);
        const titleLike = screen.getByTitle("Good")

        expect(titleLike).toBeInTheDocument()

    }
)

test('Test Option Click',
    () => {
        render(<Options
            item={
                {
                    image: "like.webp",
                    label: "Good"
                }
            } summary={[{
                question: 'test case check',
                answer: 'Good'
            }]}
            data={[
                {
                    introline: 'test case check'
                }
            ]}
            activeIndex={0}
            selectOption={() => { }}
        />);
        const img = screen.getByTitle("Good");
        fireEvent.click(img)
        expect(screen.getByText('Good')).toBeInTheDocument()
    }
)