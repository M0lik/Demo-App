import { CreateCompanyDto } from '../components/company/dto/create-company.dto';

export class MongoMock {
  data: any[] = [];

  find() {
    return {
      exec: jest.fn(() => this.data),
      populate: () => {
        return {
          exec: jest.fn(() => this.data),
        };
      },
    };
  }

  findOne = jest.fn(({ username }) => {
    return {
      exec: jest.fn(() => this.data.find((e) => e.username === username)),
    };
  });

  create = jest.fn((dataDto: CreateCompanyDto) => {
    this.data.push({ ...dataDto, _id: this.data.length.toString() });
  });

  findById(id: string) {
    return {
      exec: jest.fn(() => {
        const tmpData = this.data.find((e) => e._id === id);
        if (tmpData === undefined) return null;
        else return tmpData;
      }),
    };
  }

  deleteOne({ _id }) {
    return {
      exec: jest.fn(() => {
        if (this.data.find((e) => e._id === _id) === undefined) {
          return { deletedCount: 0 };
        }
        this.data = this.data.filter((e) => e._id !== _id);
        return { deletedCount: 1 };
      }),
    };
  }
}
