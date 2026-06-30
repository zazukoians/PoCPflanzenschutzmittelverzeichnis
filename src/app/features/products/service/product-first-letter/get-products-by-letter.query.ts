export function getProductsByLetterQuery(firstLetter: string): string {
	return `
	
PREFIX psm: <https://agriculture.ld.admin.ch/plant-protection/>
PREFIX schema: <http://schema.org/> 
SELECT *  WHERE {
    VALUES ?productType {
        psm:ParallelImport
        psm:SalePermission
        psm:RegularProduct
    }
    ?iri a ?productType. 
    ?iri schema:name ?label . 
    BIND(UCASE(SUBSTR(STR(?label), 1, 1)) as ?firstLetter)
    FILTER(?firstLetter = '${firstLetter}')
    ?iri psm:federalAdmissionNumber ?federalAdmissionNumber.
} ORDER by ?label
`;
}
