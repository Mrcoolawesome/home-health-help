/**
 * Note about difference between types and interfaces.
 * They're very similar, but you can add parameters to an interface
 * later on in code, it doesn't all have to be declared at once.
 *      Aka you can 're-declare' the interface multiple times and it'll automatcially 
 *      merge the new parameter you added to it.
 * Both types and interfaces can extend others.
 * Types can be combined as well using the `&` operator.
 * Types can describe unions which is where you can say an object COULD be multiple different types at a given time (example: <string | undefined>). 
 *      Types can also describe tuples, and 'complex conditional types' which I assume means types that are a certian type dependent on some condition.
 */

export type PersonalPageProps = { params: Promise<{ id: string }> };

export type HospiceDisplayProps = { params: Promise<{ id: string }> } 

export type PersonalPageDisplayProps = { id: string };