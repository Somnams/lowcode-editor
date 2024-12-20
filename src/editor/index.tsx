import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import EditArea from './components/EditArea';
import Material from './components/Material';
import Settings from './components/Settings';

const ReactPlayGround = () => {
    return <div className="flex flex-col h-[100vh]">
        <div className="h-[60px] flex items-center border-b-[1px] border-[#000]">Header</div>
        <Allotment>
            <Allotment.Pane minSize={200} maxSize={300} preferredSize={240}>
                <Material />
            </Allotment.Pane>
            <Allotment.Pane>
                <EditArea />
            </Allotment.Pane>
            <Allotment.Pane minSize={300} maxSize={500} preferredSize={300}>
                <Settings />
            </Allotment.Pane>
        </Allotment>
    </div>
};

export default ReactPlayGround;