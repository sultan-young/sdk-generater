import * as uuid from 'uuid';

class UniqueService {
	static uniqueToken: string | null = '';
	createUniqueToken(): string | null {
		const uniqueToken = localStorage.getItem('uniqueToken');
		if (!uniqueToken) {
			localStorage.setItem('uniqueToken', uuid.v4());
		}
		UniqueService.uniqueToken = localStorage.getItem('uniqueToken');
		return UniqueService.uniqueToken;
	}
	createOtherPvId() {
		return uuid.v4();
	}
}
new UniqueService().createUniqueToken();
export const uniqueToken = UniqueService.uniqueToken;
export const pvId = new UniqueService().createOtherPvId();
