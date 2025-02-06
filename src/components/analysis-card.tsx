import { Card, CardContent, CardHeader } from './ui/card';

interface AnalysisCardProps {
    title: string;
    value: number;
    subText: string;
}

export default function AnalysisCard({ title, value, subText }: AnalysisCardProps) {
    return (
        <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="font-bold pb-2 text-lg">{title}</CardHeader>
            <CardContent>
                <p>
                    <span className="font-semibold text-3xl">{value}</span>{' '}
                    <span className="text-muted-foreground">{subText}</span>
                </p>
            </CardContent>
        </Card>
    );
}
