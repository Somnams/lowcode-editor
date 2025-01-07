import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import EditArea from './components/EditArea';
import Setting from './components/Setting';
import MaterialWrapper from './components/MaterialWrapper';
import { EMode, useComponentsStore } from './stores/components';
import Preview from './components/Preview';
import Header from './components/Header';

const ReactPlayGround = () => {
    const { mode } = useComponentsStore();

    return <div className="flex flex-col h-[100vh]">
        <div className="h-[60px] flex items-center border-b-[1px] border-[#000]">
            <Header />
        </div>
        {
            mode === EMode.preview ?
                <Preview />
                :
                <Allotment>
                    <Allotment.Pane minSize={200} maxSize={300} preferredSize={240}>
                        <MaterialWrapper />
                    </Allotment.Pane>
                    <Allotment.Pane>
                        <EditArea />
                    </Allotment.Pane>
                    <Allotment.Pane minSize={300} maxSize={500} preferredSize={300}>
                        <Setting />
                    </Allotment.Pane>
                </Allotment>
        }
    </div>
};

export default ReactPlayGround;