export const deleteAction = async (id: Number) => {
  try {
    const response = await fetch(`/api/insights/delete/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in deleting insight ${id}`);
  }
};

export const createAction = async (insight: any) => {
  try {
    const response = await fetch(`/api/insights/create`, {
      method: "POST",
      body: JSON.stringify(insight),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in creating insight ${error}`);
  }
};

export const getAllAction = async () => {
  try {
    const response = await fetch(`/api/insights/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in fetching insights ${error}`);
  }
};
