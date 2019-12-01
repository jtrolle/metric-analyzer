import React, { useState, ReactElement } from 'react';
import { Collapse, CardHeader, CardBody, Card, CardTitle } from 'reactstrap';

interface ownProps {
    title: string,
    children?: ReactElement
    isOpen?: boolean
}

const CollapseCard: React.FC<ownProps> = (props: ownProps) => {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const toggle = () => setIsOpen(!isOpen);

    return <Card className="card--collapse">
        <CardHeader onClick={toggle}>
            <CardTitle>{props.title}</CardTitle>
        </CardHeader>
        <Collapse isOpen={isOpen}>
            <CardBody>
                {props.children}
            </CardBody>
        </Collapse>
    </Card>
}

export default CollapseCard;