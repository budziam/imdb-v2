import { AxiosInstance } from "axios";
import { injectable } from "inversify";

export interface OmdbMovie {
    Title: string;
    Year: string;
    Released: string;
    Plot: string;
}

@injectable()
export class OmdbRequester {
    public constructor(
        private readonly axios: AxiosInstance,
        private readonly apiKey: string,
    ) {
        //
    }

    public async findByTitle(title: string): Promise<OmdbMovie> {
        const params = {
            apiKey: this.apiKey,
            t: title,
        };

        const response = await this.axios.get("https://www.omdbapi.com", {params});

        if (response.data.Error) {
            throw new Error("Invalid response");
        }

        return response.data;
    }
}
