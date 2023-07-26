import { DataSource, DataSourceOptions } from 'typeorm';
import configuration from 'src/config/configuration';

export const dataSourceOptions: DataSourceOptions = configuration().database;

const typeORMSource = new DataSource(dataSourceOptions);
export default typeORMSource;
