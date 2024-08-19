import Loading_animation from '@/app/loading_animation';
import TimedPopup from '@/app/timed_popup';
import React, { useEffect, useState, useRef, useReducer } from 'react'
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';

interface Metrics {
    id: number;
    date_time: string;
    serial_number_device: string;
    id_location: number;
    name_metric_type: number;
    value: number;
}

const metricDataDummy: Metrics[] = [
    {
        id: 1,
        date_time: "2022-01-01T00:00:00Z",
        serial_number_device: "ABC123",
        id_location: 1,
        name_metric_type: 1,
        value: 10.5,
    },
    {
        id: 2,
        date_time: "2022-01-02T00:00:00Z",
        serial_number_device: "DEF456",
        id_location: 2,
        name_metric_type: 2,
        value: 20.2,
    },
];

const GRAPHIC_VIEWER = (props: any) => {
    const params = ['Temperatura', 'Temperatura de globo', 'Umidade', 'Velocidade do vento']
    const [requestedData, setRequestedData] = useState<Metrics[]>(metricDataDummy);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const activeParams = params.reduce((obj: any, param) => {
        obj[param] = true;
        return obj;
    }, {});
    const [clickedButtons, setClickedButtons] = useState(activeParams);

    const abortControllerRef = useRef<AbortController | null>(null);
    const signal = abortControllerRef.current?.signal;
    let metricsURL = '/api/v1/metrics';

    const getMetrics = async () => {
        var data;
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        setIsLoading(true);
        try {
            data = await fetch(`${metricsURL}`, { method: 'GET', signal: abortControllerRef.current?.signal })
            const deviceData = (await data.json()) as Metrics[]
            setRequestedData(deviceData)
            setIsLoading(false);
        } catch (e: any) {
            if (e.name === 'AbortError') {
                console.log('Fetch aborted');
                return;
            }
            setError(e)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (props.signalToMetrics == true) {
            getMetrics()
            props.setSignalToMetrics(false)
        }
    }, [props.signalToMetrics])


    const handleClick = (option: string) => {
        let newParam = { ...clickedButtons, [option]: !clickedButtons[option] }
        setClickedButtons(newParam);
    };

    return (
        <div className='relative flex flex-col justify-center items-center'>

            {isLoading && <Loading_animation />}

            {error && <TimedPopup title={"OOPS, something went wrong..."} message={error} className={"absolute right-0 bottom-0 m-4 text-2xl font-bold font-montserrat text-center"} />}
            {requestedData && (
                <div className='flex justify-center items-center m-10 bg-slate-200 rounded-md'>
                    <LineChart
                        width={screen.width * 0.7}
                        height={screen.height * 0.7}
                        data={requestedData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid stroke='#ccc' strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <XAxis dataKey="date_time" />
                        <YAxis />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        {

                        }
                    </LineChart>
                </div>
            )}
            <div className='flex flex-col md:flex-row text-center justify-center space-y-4 md:space-y-0 md:space-x-10'>
                {
                    params.map((value, index) => <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' key={index} onClick={() => { handleClick(value) }}>{value}</button>)
                }
            </div>
        </div>
    )
}

export default GRAPHIC_VIEWER