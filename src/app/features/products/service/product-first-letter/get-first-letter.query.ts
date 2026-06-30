export function getFirstLetterQuery(): string {
	return `
PREFIX psm: <https://agriculture.ld.admin.ch/plant-protection/>
PREFIX schema: <http://schema.org/> 
SELECT DISTINCT ?firstLetter WHERE {
    VALUES ?productType {
        psm:ParallelImport
        psm:SalePermission
        psm:RegularProduct
    }
    ?s a ?productType. 
    ?s schema:name ?name . 
    BIND(UCASE(SUBSTR(STR(?name), 1, 1)) as ?firstLetter)
} ORDER by ?firstLetter 
    `;
}
