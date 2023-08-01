import {RedocStandalone} from 'redoc';

export default function RedocDemo() {
  return (
    <div>
      <RedocStandalone specUrl='./open-api.json'/>
    </div>
  );
}
