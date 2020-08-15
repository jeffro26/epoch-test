import React from "react";

import HeaderBar from "../../components/Header";
import renderer from "react-test-renderer";

describe("Header Bar", () => {
  it("Snapshot match", () => {
    const tree1 = renderer.create(<HeaderBar />).toJSON();
    expect(tree1).toMatchSnapshot();
  });
});
