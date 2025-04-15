import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useQuestions} from "../../context/QuestionsContext.jsx";
import { Button } from 'primereact/button';

function QuestionDataTable() {
    const {questions} = useQuestions()
    return (
        <div className="card">
            <div className="card flex justify-content-center">
                <Button label="Check" icon="pi pi-check" />
            </div>
            <DataTable showGridlines value={questions} tableStyle={{ minWidth: '50rem' }}>
                <Column field="title" header="Title"></Column>
                <Column field="exam_type" header="Exam Type"></Column>
                <Column field="course" header="Course"></Column>
            </DataTable>
        </div>
    );
}

export default QuestionDataTable;