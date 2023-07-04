export const updateObjectInArray = (
    items: Array<any>,
    itemId: number,
    objPropName: string,
    newObjProps: any
) => {
    return items.map((u) => {
        if (itemId === u[`${objPropName}`]) {
            return { ...u, ...newObjProps };
        }
        return u;
    });
};
