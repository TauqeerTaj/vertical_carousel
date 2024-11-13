import { render, screen } from "@testing-library/react";
import SummaryItem from ".";

test('Find "Qestion" and "Answer" heading',
    () => {
        render(<SummaryItem question='what is your name?' answer="Jhon" />);
        const QuestionText = screen.getByText('Question:')
        const AnswerText = screen.getByText('Answer:')
        expect(QuestionText).toBeInTheDocument();
        expect(AnswerText).toBeInTheDocument();
    }
)