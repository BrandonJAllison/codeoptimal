import {Progress} from 'antd'

const Index = () => {
return(
    <div>
        <h1 className="jumbotron flux text-center square">Drone Driver</h1>
        <div style={{width:'50%'}}>

        <Progress
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      percent={99.9}
    />
    <Progress
      strokeColor={{
        from: '#108ee9',
        to: '#87d068',
      }}
      percent={99.9}
      status="active"
    />
    <Progress
      type="circle"
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      percent={90}
    />
    <Progress
      type="circle"
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      percent={100}
    />
        
    </div>
    </div>
);
};

export default Index;